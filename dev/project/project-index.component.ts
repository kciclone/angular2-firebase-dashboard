import {Component, OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';



//Service
import {ProjectService} from "./project.service";
import {Project} from './project';

@Component({
    selector: 'projets-index',
    templateUrl: '/dev/project/project-index.component.html',
    directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, CORE_DIRECTIVES],
    pipes: [TranslatePipe],
    providers: [ProjectService]

})

export class ProjectIndexComponent implements OnInit {
    projects_list: Project[];

    constructor(private _projectService: ProjectService, private _router: Router) { }

    ViewProject(project: Project) {
        this._router.navigate(["ProjectView", { id: project.id }])
    }

    deleteProject(project: Project) {
        this._projectService.deleteProject(project.id).subscribe(
            this._router.parent.navigateByUrl('/Home/Project')
        );
    }

    ngOnInit() {
        console.log('ngoninit');
        this._projectService.getProjects()
            .subscribe(
            projects_list => this.projects_list = projects_list,
            error => console.log(error)
            );
    }
}